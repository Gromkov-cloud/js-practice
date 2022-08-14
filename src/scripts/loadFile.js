export const UploadingSendingFiles = () => {
    
    const chooseBtn = document.getElementsByClassName("UaS-file-choose")[0]
    const fileInput = document.getElementById("UaSInputFile")

    const imagesContainer = document.getElementsByClassName(
        "images-preview-container"
    )[0]
    let imageUrls = []

    chooseBtn.addEventListener("click", () => {
        fileInput.click()
    })

    fileInput.addEventListener("change", () => {
        if (imageUrls) {
            imageUrls.forEach((url) => {
                URL.revokeObjectURL(url)
            })
        }

        const files = fileInput.files
        createImage(files)
    })

    const createImage = (files) => {
        imagesContainer.innerHTML = ""

        files = Array.from(files)

        files.forEach((blob) => {
            const imageContainer = document.createElement("div")
            const image = document.createElement("img")

            imageContainer.classList.add("image-container")
            imageContainer.appendChild(image)

            // first solution: with FileLoader API and readAsDataURL method
            // const reader = new FileReader()
            // reader.readAsDataURL(blob)
            // reader.onload = () => {
            //     image.src = reader.result
            // }

            // second solution: with URL API and createObjectURL method
            const URLSrc = URL.createObjectURL(blob)
            imageUrls.push(URLSrc)

            image.classList.add("UaS-image")
            image.src = URLSrc

            imagesContainer.insertAdjacentElement("afterbegin", imageContainer)
        })
    }
}
