function calculateDuration(duration_ms: number) {
    const minutes: number = Math.floor(duration_ms / 60000); 
    const seconds: number = Math.floor((duration_ms % 60000) / 1000);

    const minutesStr: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr: string = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutesStr}:${secondsStr}`;
}

export default calculateDuration;