import React, { useState } from 'react'
import CardFront from '../CardFront/CardFront';
import CardBack from '../CardBack/CardBack';

interface CardProps {
    dateCreated: string;
    displayName: string;
    groupName: string;
    groupSecretCode: string;
    id: number;
    ownerId: number;
    songImage: string;
    songName: string;
}

const Card: React.FC<{ groupData: CardProps }> = ({ groupData }) => {
    const [showFront, setShowFront] = useState(true);
    return (
        <>
            {showFront ?
                <CardFront groupData={groupData} setShowFront={setShowFront} /> :
                <CardBack groupData={groupData} setShowFront={setShowFront} />}
        </>
    )
}

export default Card
