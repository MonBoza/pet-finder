export default class PoemFinder {
    static async getPoem(keyword) {
        try{
        const response = await fetch(`https://poetrydb.org/title/${keyword}`)
        const jsonResponse = await response.json();
            if (!response.ok) {
                const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
                throw new Error(errorMessage);
            }
            return jsonResponse;
          } catch(error) {
            return error;
        }
    }
}