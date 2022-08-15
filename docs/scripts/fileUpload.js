import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const storage = getStorage()

export const uploadImages = (fileData) => {

    const fileRef = ref(storage, fileData.file.name)
    const imageUploadTask = uploadBytesResumable(fileRef, fileData.file)

    const imageInfo = fileData.domContainer.getElementsByClassName("image-footer")[0]
    imageInfo.innerHTML = ""
    const progressBar = document.createElement("div")
    progressBar.classList.add("progress-bar")
    imageInfo.appendChild(progressBar)

    const progressPercents = document.createElement("div")
    progressPercents.classList.add("progress-percents")
    imageInfo.appendChild(progressPercents)

    imageInfo.classList.add("upload")

    imageUploadTask.on("state_changed", (snapshot) => {
        const progress = Math.ceil(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )

        progressBar.style.width = progress + "%"

        imageInfo.getElementsByClassName("progress-percents")[0].textContent = progress + "%"
    })
}
