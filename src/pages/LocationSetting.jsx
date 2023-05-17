import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
import { Layout } from '../components/element';

const { kakao } = window;

function LocationSetting() {
    // map값 저장해두기   
    const [mapState, setMapState] = useState(null);
    
    useEffect(()=> {
        const Container = document.getElementById('map');
        const options = {
            // 기준 좌표 : 회원가입할 때 받아논 주소 좌표 입력하기
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level:2
        };
        // 지도 생성
        const map = new kakao.maps.Map(Container, options);
        setMapState(map);

        // 지금 위치 마커 생성
        var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 지도 위에 주변 동네 원형 영역 표시하기
        var circle = new kakao.maps.Circle({
            center : new kakao.maps.LatLng(33.450701, 126.570667),  // 원의 중심좌표 입니다 
            radius: 100, // 미터 단위의 원의 반지름입니다 
            strokeWeight: 1, // 선의 두께입니다 
            strokeColor: '#75B8FA', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            // strokeStyle: 'dashed', // 선의 스타일 입니다
            fillColor: '#CFE7FF', // 채우기 색깔입니다
            fillOpacity: 0.5  // 채우기 불투명도 입니다   
        }); 
        // 초기 원형 영역 값
        circle.setMap(map);

        // 내 동네 설정에서 버튼 클릭시 mapLevel조정
        const buttons = document.querySelectorAll('.map-level-button');
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                // 모든 버튼에서 checked 클래스 제거
                buttons.forEach((btn) => {
                    btn.classList.remove('checked');
                });
                // 해당 버튼에만 checked 클래스 추가
                e.target.classList.add('checked');

                const mapLevel = parseInt(button.dataset.level);
                const mapRadius = parseInt(button.dataset.radius);

                map.setLevel(mapLevel);
                circle.setRadius(mapRadius);
                circle.setMap(map);
            });
        });

    },[]);
  return (
    <Layout>
        <h1 style={{fontSize:"25px"}}>내 동네 설정</h1>
        <MapArea>
            <div id='map' style={{width:"100%",height:"500px"}}></div>
        </MapArea>
        <MapController>
            <h2 >내 동네</h2>
            <p className='mytown'>공릉동</p>
            <Controller>
                <p>가까운 동네</p>
                <button type='button' id='m500' className="map-level-button checked" data-level="3" data-radius="250"></button>
                <button type='button' id='m1000' className="map-level-button" data-level="4" data-radius="500"></button>
                <button type='button' id='m1500' className="map-level-button" data-level="5" data-radius="750"></button>
                <button type='button' id='m2000' className="map-level-button" data-level="6" data-radius="1000"></button>
                <p>먼 동네</p>
            </Controller>
        </MapController>
    </Layout>
  )
}

export default LocationSetting;

const MapArea = styled.section`

`
const MapController = styled.section`
    & .mytown{
        display:inline-block;
        background-color:#FF7E36;
        margin:0;
        padding:7px 20px;
        color:#fff;
        border-radius:10px;
    }

`
const Controller = styled.section`
    position:relative;
    width:100%;
    height:10px;
    margin:40px 0;
    background-color:#ccc;
    border-radius:10px;
    & p{
        position:absolute;
        top:10px;
    }
    & p:first-of-type{
        left:0;
    }
    & p:last-of-type{
        right:0;
    }
    & button{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width:30px;
        height:30px;
        border-radius:18px;
        border:none;
        background-color:#ccc;
        transition:.4s;
    }
    & button.checked{
        width:30px;
        height:30px;
        background-color:#FF7E36;
    }
    & #m500{
        left:0;
    }
    & #m1000{
        left:32%;
    }
    & #m1500{
        left:64%;
    }
    & #m2000{
        right:0;
    }
    
`

