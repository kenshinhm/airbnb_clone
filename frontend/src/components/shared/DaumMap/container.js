import React from 'react';
import loadjs from 'loadjs';

class Map extends React.Component {

    componentDidMount() {
        loadjs(
            '//dapi.kakao.com/v2/maps/sdk.js?appkey=fb0879153d683915d97e3d1c134a8c8c&autoload=false&libraries=services,clusterer,drawing',
            this.makeMap
        );
    }

    makeMap = () => {
        const {daum} = window;
        const lat = this.props.lat;
        const lng = this.props.lng;
        daum.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
                center: new daum.maps.LatLng(lat, lng),
                level: 3,
            };

            const map = new daum.maps.Map(container, options);
            // 마커가 표시될 위치입니다
            const markerPosition = new daum.maps.LatLng(lat, lng);
            // 마커를 생성합니다
            const marker = new daum.maps.Marker({
                position: markerPosition
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
            const mapTypeControl = new daum.maps.MapTypeControl();

            // 지도 타입 컨트롤을 지도에 표시합니다
            map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

        });
    };

    render() {
        return (
            <div id='map' style={{width: '100%', height: '100%'}}/>
        );
    }
}

export default Map;