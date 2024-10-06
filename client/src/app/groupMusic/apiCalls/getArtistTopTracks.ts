type AuthHeader = {
    Authorization: string;
};

const getArtistTopTracks = async (headers: AuthHeader, artistId: string): Promise<any | null> => {
    if(artistId === '' || !artistId) {
        return;
    }

    let url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to get results - ${response.statusText}`);
    }
    const jsonResult = await response.json();

    return jsonResult;
}

export default getArtistTopTracks;