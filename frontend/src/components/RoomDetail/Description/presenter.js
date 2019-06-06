import React from 'react';
import styles from './styles.scss';
import houseIcon from "img/houseIcon.png";
import superHostIcon from "img/superHostIcon.png";


const Description = props => {

    const room = props.room;
    const summary = room.detail_summary.split('\n');
    const space = room.detail_space.split('\n');
    const others = room.detail_others.split('\n');
    const guest_access = room.detail_guest_access.split('\n');
    const guest_interaction = room.detail_guest_interaction.split('\n');
    const infos = [space, guest_access, guest_interaction, others];

    return (
        <div className={styles.container}>
            <div className={styles.infoSummaryContainer}>
                <div className={styles.summaryItem}>
                    <div className={styles.summaryHeader}>
                        <img src={houseIcon} className={styles.icon} alt='house'/>
                        <span className={styles.text}>집 전체</span>
                    </div>
                    <div className={styles.summaryContent}>
                        <span className={styles.text}>인원 {room.capacity_cnt}명</span>
                        <span className={styles.text}>침실 {room.bedroom_cnt}개 </span>
                        <span className={styles.text}>침대 {room.bed_cnt}개 </span>
                        <span className={styles.text}>욕실 {room.bathroom_cnt}개 </span>
                    </div>
                </div>
                {
                    room.is_super_host ?
                        <div className={styles.summaryItem}>
                            <div className={styles.summaryHeader}>
                                <img src={superHostIcon} className={styles.icon} alt='superhost'/>
                                <span className={styles.text}>{room.host.username}님은 슈퍼호스트입니다</span>
                            </div>
                            <div className={styles.summaryContent}>
                                <span className={styles.text}>슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며
                                게스트가 숙소에서 편안히 머무를 수 있도록 최선을 다하는 호스트입니다.</span>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.infoItemFirst}>
                    {summary.map((item, index) => {
                        if (item === "\r") {
                            return <br key={index}/>;
                        } else {
                            return (
                                <p key={index}>{item}</p>
                            );
                        }
                    })}
                </div>
                <div className={styles.infoItemOthers}
                     style={props.showInfo ? {display: 'block'} : {display: 'none'}}>
                    {
                        infos.map((info, index) => {
                            return (
                                <div key={index} className={styles.infoItem}>
                                    {
                                        info.map((item, index) => {
                                            if (item === "\r") {
                                                return <br key={index}/>;
                                            } else {
                                                return (
                                                    <p key={index}>{item}</p>
                                                );
                                            }
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
                <button onClick={props.onClickInfo}>
                    {
                        props.showInfo ?
                            <span>숨기기</span>
                            :
                            <span>이 공간 자세히 알아보기</span>
                    }
                </button>
                <button>
                    호스트에게 연락하기
                </button>
            </div>
        </div>
    );
};

export default Description;



