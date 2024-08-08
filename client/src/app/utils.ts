export const encodeGroupId = (groupId: string) => {
    return btoa(groupId); 
};

export const decodeGroupId = (encodedGroupId: string) => {
    return atob(encodedGroupId); 
};

export const getImageLetters = (name: string) => {
    if (name.length >= 2) {
        return name.substring(0, 2).toUpperCase();
    } else {
        return name.toUpperCase();
    }
}

export const getColorHexValue = () => {
    // const colors = ['B467E0', '84A596', '9CE070', 'A090F4', '6466DC', 'B2A097'];
    // Implement random colors and also rectify the alignments issue with the sign up declarations
    const threshold = 100;
    const r = Math.floor(Math.random() * (256 - threshold) + threshold);
    const g = Math.floor(Math.random() * (256 - threshold) + threshold);
    const b = Math.floor(Math.random() * (256 - threshold) + threshold);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = hours.toString().padStart(2, '0');

    return `${day}-${month}-${year} ${strHours}:${minutes} ${ampm}`;  
}