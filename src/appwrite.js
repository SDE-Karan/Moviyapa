import { Client, Databases, ID, Query } from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {

    if (!searchTerm) {
        console.warn('updateSearchCount called without valid searchTerm:', searchTerm);
        return; // Don't run the query if searchTerm is falsy
      }

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm)
    ])

    if (result.documents.length > 0) {
      const doc = result.documents[0]
      return await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        countSearch: Number(doc.countSearch) + 1,
      })
    } else {
      return await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        countSearch: 1,
        movie_id: movie?.id,
        posterURL: movie?.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : '',
      })
    }
  } catch (error) {
    console.error("Failed to update or create search count", error)
  }
}


export const getTrendingMovies = async()=>{
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("countSearch")
        ])

        return result.documents

    }catch(error){
        console.log(error)

    }
}
