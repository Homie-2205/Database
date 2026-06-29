document.addEventListener('DOMContentLoaded', () => {
    const marker1 = document.querySelector('#marker-1');
    const marker2 = document.querySelector('#marker-2');
    const distanceOutput = document.querySelector('#distance-output');

    let position1 = new THREE.Vector3();
    let position2 = new THREE.Vector3();

    function updateDistance() {
        // Check if both markers are currently visible in the camera frame
        if (marker1 && marker2 && marker1.object3D.visible && marker2.object3D.visible) {
            
            // Get world positions of the markers
            marker1.object3D.getWorldPosition(position1);
            marker2.object3D.getWorldPosition(position2);

            // Calculate Euclidean distance between the two points
            const distance = position1.distanceTo(position2);

            // Update the UI with the measured distance (converted to cm if under 1m)
            if (distance < 1.0) {
                distanceOutput.textContent = `${(distance * 100).toFixed(1)} cm`;
            } else {
                distanceOutput.textContent = `${distance.toFixed(2)} m`;
            }
        } else {
            distanceOutput.textContent = 'Waiting for both markers...';
        }
    }

    // Run distance calculation continuously in the render loop
    setInterval(updateDistance, 100);
});
