type AuthHeader = {
    Authorization: string;
};

const getExploreTracks = async (headers: AuthHeader, trackId: string, artistId: string | null, genres: string | null): Promise<any | null> => {
    if(!artistId && !genres) {
        return;
    }
    let url = `https://api.spotify.com/v1/recommendations?seed_artists=${artistId}&seed_tracks=${trackId}`;
    if (genres) {
        url = `https://api.spotify.com/v1/recommendations?seed_genres=${genres}y&seed_tracks=${trackId}`;
    }

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

export default getExploreTracks;