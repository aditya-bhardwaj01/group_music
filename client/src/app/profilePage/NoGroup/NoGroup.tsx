import CreateGroup from "../CreateGroup/CreateGroup";
import JoinGroup from "../JoinGroup/JoinGroup";
import NoGroupImage from '../../../assets/noGroup.png';
import Image from "next/image";

import styles from './NoGroup.module.css';

type NoGroupgProps = {
    groupType: string
};

const NoGroup: React.FC<NoGroupgProps> = ({ groupType }) => {

    return (
        <div className={styles.NoGroup}>
            <Image src={NoGroupImage} alt="No Image found" height={70} width={70}></Image>
            <p>Sorry!! We cannot find any groups.</p>
            <br />
            {groupType === 'owner' ? <CreateGroup /> : <JoinGroup />}
        </div>
    )
}

export default NoGroup
