import { uploadImages } from "./fileUpload"
export const UploadingSendingFiles = (fileInputId) => {
    const createElement = (tag, classes, text, disable) => {
        const element = document.createElement(tag)
        element.classList.add(...classes)
        element.textContent = text || ""

        disable ? (element.disabled = true) : ""
        return element
    }

    let imageUrls = []
    let closeBtn
    let files = []
    let filesData = []

    const input = document.getElementById(fileInputId)
    const imagesContainer = createElement("div", ["images-preview-container"])
    const btnContainer = createElement("div", ["buttons-container"])
    const openBtn = createElement("button", ["file-choose-btn"], "Open")
    const uploadBtn = createElement(
        "button",
        ["file-upload-btn"],
        "Upload",
        true
    )
    const loadingProgressBar = createElement(
        "div",
        ["loading-progress-bar"],
        "0"
    )
    btnContainer.insertAdjacentElement("afterbegin", openBtn)
    btnContainer.insertAdjacentElement("beforeend", uploadBtn)
    input.insertAdjacentElement("afterend", btnContainer)

    const revokeURLs = (urls) => {
        if (urls) {
            urls.forEach((url) => {
                URL.revokeObjectURL(url)
            })
        }
    }

    const uploadBtnHandler = (files) => {
        uploadBtn.disabled = true
        filesData.forEach((fileData) => {
            uploadImages(fileData)
        })
    }

    const closeBtnHandler = (e) => {
        const parent = e.target.parentNode

        parent.classList.add("removing")

        setTimeout(() => {
            parent.remove()
        }, 200)

        const targetName = e.target.dataset.name

        filesData.forEach((fileData) => {
            if (fileData.file.name === targetName) {
                filesData = filesData.filter(
                    (fileData) => fileData.file.name != targetName
                )
            }
        })

        if (!filesData.length) {
            uploadBtn.disabled = true
            imagesContainer.classList.add("removing")
            setTimeout(() => {
                imagesContainer.remove()
            }, 200)
        }
    }

    const trimFileName = (name) => {
        if (name.length > 13) {
            name = name.toLowerCase().slice(0, 13)
            console.log(name)
            name += "..."
            
            return name
        } else {
            name = name.toLowerCase()

            return name
        }
    }

    const createImage = (inputFiles) => {
        uploadBtn.disabled = false
        btnContainer.insertAdjacentElement("afterend", imagesContainer)
        imagesContainer.innerHTML = ""

        inputFiles.forEach((fileData) => {
            const src = URL.createObjectURL(fileData.file)
            const size = bytesToSize(fileData.file.size)
            const name = trimFileName(fileData.file.name)

            imageUrls.push(src)

            imagesContainer.insertAdjacentHTML(
                "afterbegin",
                `
                <div class="image-container">
                    <div class="btn-close" data-name="${fileData.file.name}">&times;</div>
                    <img class="image" src="${src}" alt="${fileData.file.name}"/>
                    <div class="image-footer">
                        <span> ${name}</span>
                        <span>${size}</span>
                    </div>
                </div>
                `
            )

            closeBtn = imagesContainer.getElementsByClassName("btn-close")[0]
            closeBtn.addEventListener("click", (e) => {
                closeBtnHandler(e)
            })
            fileData.domContainer = imagesContainer.getElementsByClassName("image-container")[0]
        })
    }

    const removeCloseButtons = (buttons) => {
        console.log(buttons)
        Array.from(buttons).forEach(button => {
            button.remove()
        })
    }

    input.addEventListener("change", () => {
        files = Array.from(input.files)

        filesData = []

        files.forEach((file) => {
            filesData.push({
                file,
                domContainer: "",
            })
        })

        if (files.length) {
            revokeURLs(imageUrls)
            createImage(filesData)
        }
    })

    openBtn.addEventListener("click", () => {
        input.click()
    })

    uploadBtn.addEventListener("click", () => {
        const closeButtons = imagesContainer.getElementsByClassName("btn-close")
        removeCloseButtons(closeButtons)
        uploadBtnHandler()
    })
}

function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes == 0) return "0 Byte"
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
}