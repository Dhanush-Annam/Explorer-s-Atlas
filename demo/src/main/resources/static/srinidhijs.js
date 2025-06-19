function openModal(imageSrc, destinationName) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalText = document.getElementById('modalText');

    modalImage.src = imageSrc;
    modalText.textContent = destinationName;
    modal.style.display = 'flex';
}


function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}


window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
