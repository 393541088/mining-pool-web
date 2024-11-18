<template>
    <!-- 用于渲染 Three.js 场景的容器 -->
    <div ref="sceneContainer" class="scene-container"></div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as THREE from 'three';
  
  export default {
    name: 'SciFiBackground',
    setup() {
      const sceneContainer = ref(null);
  
      // 初始化 Three.js 场景
      const initThreeJsScene = () => {
        const container = sceneContainer.value;
        if (!container) return;
  
        // 创建场景
        const scene = new THREE.Scene();
  
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
          75, 
          window.innerWidth / window.innerHeight, 
          0.1, 
          1000
        );
        camera.position.z = 500;
  
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
  
        // 创建粒子系统
        const particlesCount = 4000;
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xFFCC00,
            size: 1.5,  // 粒子大小
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: false, // 根据相机距离调整粒子大小
        });
  
        // 粒子的坐标数组
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 2000;
        }
  
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
  
        // 动画
        const animate = () => {
          requestAnimationFrame(animate);
  
          // 粒子旋转效果
          particlesMesh.rotation.y += 0.001;
          particlesMesh.rotation.x += 0.0005;
  
          renderer.render(scene, camera);
        };
  
        animate();
  
        // 调整窗口大小时更新渲染器和相机
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      };
  
      onMounted(() => {
        initThreeJsScene();
      });
  
      return {
        sceneContainer,
      };
    },
  };
  </script>
  
  <style>
  .scene-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* 背景在最底层 */
    overflow: hidden;
    background-color: #000; /* 黑色背景，突出科幻效果 */
  }
  </style>
  