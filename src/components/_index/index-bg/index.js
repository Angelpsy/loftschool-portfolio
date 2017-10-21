import './index.scss';

const container = document.querySelector('.b-index-bg');

/**
 * @param {*} THREE
 * @return {Promise}
 */
function main(THREE) {
    return new Promise((resolve, reject) => {
        let camera;
        let scene;
        let renderer;
        let uniforms;
        let mouse = {x: 0, y: 0};
        let loader = new THREE.TextureLoader();

        let MyTexture;
        let mapTexture;

        Promise.all([
            new Promise((resolve, reject) => {
                loader.load('img/water.jpg', function(texture) {
                    MyTexture = texture;
                    resolve();
                });
            }),
            new Promise((resolve, reject) => {
                loader.load('img/water-maps.jpg', function(texture) {
                    mapTexture = texture;
                    resolve();
                });
            }),
        ])
            .then(() => {
                init();
                animate();
                document.addEventListener('mousemove', function(event) {
                    // eslint-disable-next-line no-undef
                    TweenLite.to(uniforms.u_mouse.value, 1, {
                        x: ((event.pageX / window.innerWidth) - 0.5) * 1.5,
                        y: ((event.pageY / window.innerHeight)- 0.5) * 1.5,
                    });
                });
                resolve();
            });

        /**
         *
         */
        function init() {
            camera = new THREE.Camera();
            // camera = new THREE.PerspectiveCamera(145, window.innerWidth / window.innerHeight, 1, 5000 );
            camera.position.z = 1;
            scene = new THREE.Scene();
            let geometry = new THREE.PlaneBufferGeometry( 2, 2 );
            MyTexture.minFilter = THREE.LinearFilter;

            uniforms = {
                u_time: {type: 'f', value: 1.0},
                u_animation: {type: 'f', value: 0.0},
                u_mouse: {type: 'v2', value: new THREE.Vector2()},
                u_resolution: {type: 'v2', value: new THREE.Vector2()},
                u_size: {type: 'v2', value: new THREE.Vector2(MyTexture.image.width, MyTexture.image.height)},
                u_image: {value: MyTexture},
                u_maps: {value: mapTexture},
            };
            let material = new THREE.ShaderMaterial( {
                uniforms: uniforms,
                vertexShader: document.getElementById( 'vertexShader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            } );
            let mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );

            container.appendChild( renderer.domElement );
            onWindowResize();
            window.addEventListener( 'resize', onWindowResize, false );
        }

        /**
         * @param {Event} event
         */
        function onWindowResize( event ) {
            renderer.setSize( MyTexture.image.width, MyTexture.image.height );
            uniforms.u_resolution.value.x = renderer.domElement.width;
            uniforms.u_resolution.value.y = renderer.domElement.height;
            uniforms.u_mouse.value.x = mouse.x;
            uniforms.u_mouse.value.y = mouse.y;
        }

        /**
         *
         */
        function animate() {
            requestAnimationFrame( animate );
            render();
        }

        /**
         *
         */
        function render() {
            uniforms.u_time.value += 1.5;
            renderer.render( scene, camera );
        }
    });
}

/**
 * @return {Promise}
 */
function init() {
    return new Promise((resolve, reject) => {
        require.ensure([], function() {
            require('gsap/TweenMax');
            let THREE = require('three.js');

            const vertexShader = {
                id: 'vertexShader',
                content: require('./vertex-shader'),
                el: document.createElement('script'),
            };
            const fragmentShader = {
                id: 'fragmentShader',
                content: require('./fragment-shader'),
                el: document.createElement('script'),
            };

            const shaders = [vertexShader, fragmentShader];

            shaders.forEach((shader) => {
                shader.el.id = shader.id;
                shader.el.type = 'x-shader/x-fragment';
                shader.el.innerHTML = shader.content;
                container.appendChild(shader.el);
            });

            main(THREE)
                .then(resolve)
                .catch(reject);
        });
    });
}

const bg = {
    init,
};

export {bg};
