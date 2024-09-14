type AuthHeader = {
    Authorization: string;
};

const getExploreArtists = async (headers: AuthHeader, artistId: string): Promise<any | null> => {
    let url = '';
    if (artistId && artistId != '') {
        url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;
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

export default getExploreArtists