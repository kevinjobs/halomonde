import React, { useEffect, useMemo, useRef, useState } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPost } from '@/types';
import { getPostListSync } from '@/utils/apis';
import { IExif } from '@/utils/exif';
import { PhotoInfoPanel } from '../view/photo';

import './MapView.css';

export function MapView() {
  const ak = '03Pcv1MNmPtysV97YTVG5oZQd7mTzLtR';
  const containerId = 'map-container';
  const startScale = 8;
  const defaultWidth = 80;
  const defaultHeight = 60;
  const defaultLongitude = 118.761422;
  const defaultLatitude = 32.047137;

  const [scale, setScale] = useState(8);
  const [refresh, setRefresh] = useState(Math.random());
  const [BMap, setBMap] = useState(null);
  const [imageList, setImageList] = useState<IPost[]>([]);
  const [selectPhotoUID, setSelectPhotoUID] = useState<string>(null);
  const [detailInfoVisible, setDetailInfoVisible] = useState(false);

  const selectPhoto = useMemo(() => {
    for (const image of imageList) {
      if (image.uid === selectPhotoUID) return image;
    }
  }, [selectPhotoUID]);

  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const loaded = useRef(false);

  const zoom = (scale: number) => ((scale - startScale) / 18 + 1) * 2;

  function ComplexOverlay(point: any, url: string, uid: string) {
    this._point = point || null;
    this._url = url;
    this._uid = uid;
  }

  useEffect(() => {
    if (!document.querySelector('#' + containerId)) {
      const containerEl = document.createElement('div');
      containerEl.id = containerId;
      containerEl.style.height = '100vh';
      containerEl.style.width = '100vw';
      mapContainerRef?.current.appendChild(containerEl);
      mounted.current = true;
      setRefresh(Math.random());
    }
  }, []);

  useEffect(() => {
    if (mounted.current && !loaded.current) {
      window.BMAP_PROTOCOL = 'https';
      window.BMap_loadScriptTime = new Date().getTime();
      const script = document.createElement('script');
      script.src = 'https://api.map.baidu.com/getscript?v=3.0&ak=' + ak;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        loaded.current = true;
        setRefresh(Math.random());
      };
    }
  }, [refresh, BMap]);

  useEffect(() => {
    if (loaded.current && mounted.current && BMap) {
      ComplexOverlay.prototype = new BMap.Overlay();

      ComplexOverlay.prototype.initialize = function (map: any) {
        this._map = map;
        const div = (this._div = document.createElement('div'));

        div.style.position = 'absolute';
        div.style.width = defaultWidth + 'px';
        div.style.height = defaultHeight + 'px';
        div.style.backgroundColor = '#222222f4';
        div.style.border = '4px solid #fff';
        div.className = 'img-container';
        div.dataset['uid'] = this._uid;

        div.onclick = function (e: any) {
          const uid = e.target.dataset['uid'];
          setSelectPhotoUID(uid);
        };

        div.ontouchend = function (e: any) {
          const uid = e.target.dataset['uid'];
          setSelectPhotoUID(uid);
        };

        const img = document.createElement('img');
        img.src = this._url;
        img.id = 'img-self';
        img.style.height = '100%';
        img.style.width = '100%';
        img.style.objectFit = 'contain';
        img.dataset['uid'] = this._uid;

        div.appendChild(img);

        mapRef.current.getPanes().labelPane.appendChild(div);

        return div;
      };

      ComplexOverlay.prototype.draw = function () {
        const map = this._map;
        const pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x + 'px';
        this._div.style.top = pixel.y + 'px';
      };

      mapRef.current = new BMap.Map(containerId);
      const point = new BMap.Point(defaultLongitude, defaultLatitude);
      mapRef.current.centerAndZoom(point, scale);
      mapRef.current.addControl(new BMap.NavigationControl());
      mapRef.current.addControl(new BMap.ScaleControl());
      mapRef.current.enableScrollWheelZoom();

      mapRef.current.addEventListener('zoomend', function () {
        const s = this.getZoom();
        setScale(scale);

        const divs = document.getElementsByClassName('img-container');

        for (let i = 0; i < divs.length; i++) {
          const div = divs[i] as HTMLImageElement;
          div.style.width = defaultWidth * zoom(s) + 'px';
          div.style.height = defaultHeight * zoom(s) + 'px';
        }
      });

      loadImages();
    }
  }, [refresh, BMap]);

  useEffect(() => {
    setBMap(window.BMap);
  }, [window.BMap]);

  const addImage = (post: IPost) => {
    if (!post.exif) return;

    const exif = JSON.parse(post.exif) as IExif;

    if (exif.gpsLongitude && exif.gpsLatitude && BMap) {
      const point = new BMap.Point(exif.gpsLongitude, exif.gpsLatitude);

      const imagePoint = new (ComplexOverlay as any)(
        point,
        post.url + '!thumb',
        post.uid,
      );
      mapRef.current?.addOverlay(imagePoint);
    }
  };

  const loadImages = async (page = 0, size = 999) => {
    getPostListSync(
      { offset: page, limit: size, type: 'photo' },
      (postList) => {
        setImageList(postList);
        for (const item of postList) {
          addImage(item);
        }
      },
      (errMsg) => console.log(errMsg),
    );
  };

  const handleClick = () => {
    setSelectPhotoUID(null);
  };

  return (
    <div ref={mapContainerRef}>
      {selectPhoto && (
        <div className="map-photo-view" onClick={handleClick}>
          <div>
            <div>
              <img src={selectPhoto.url + '!compressed'} alt="preview" />
            </div>
            <PhotoInfoPanel
              post={selectPhoto}
              infoVisible={detailInfoVisible}
              onClickView={() => setDetailInfoVisible(!detailInfoVisible)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
