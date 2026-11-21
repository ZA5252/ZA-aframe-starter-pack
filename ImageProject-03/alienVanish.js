AFRAME.registerComponent('vanish-on-look', {
    schema: {
        angle: {type: 'number', default: 10}
    },
    init: function () {
        this.camera = this.el.sceneEl.camera;
        this.camPos = new THREE.Vector3();
        this.camDir = new THREE.Vector3();
        this.objPos = new THREE.Vector3();
        this.toObj = new THREE.Vector3();
    },
    tick: function () {
        if (!this.camera) { this.camera = this.el.sceneEl.camera; return; }
        this.camera.getWorldPosition(this.camPos);
        this.camera.getWorldDirection(this.camDir);
        this.el.object3D.getWorldPosition(this.objPos);
        this.toObj.subVectors(this.objPos, this.camPos).normalize();
        var angle = THREE.MathUtils.radToDeg(this.camDir.angleTo(this.toObj));
        this.el.object3D.visible = angle > this.data.angle;
    }
});