/* eslint-disable */

import { useState } from "react"
import { useAppDispatch } from "../hooks/hooks"
import { toggleCharacterUpload } from "../slices/preferences/preferencesSlice"
import { Modal } from "./Modal"
import { apiCall } from "../api/BaseUrl"
import { baseUrl } from "../api/BaseUrl"

export const CustomUpload: React.FC = () => {
    const dispatch = useAppDispatch()
    const [uploadFile, setUploadFile] = useState<any>()

    const onChangeHandler = (event: any) => {
        setUploadFile(event.target.files[0])
        console.log(event)
    }

    const onSubmitHandler = () => {
        dispatch(toggleCharacterUpload())

        const formData = new FormData()
        formData.append('File', uploadFile)
        fetch(
			`${baseUrl}/demo/uploadCharacter`,
			{
				method: 'POST',
				body: formData,
			}
		)
    }

    return (
        <>
            <Modal title="Upload custom character" onOk={onSubmitHandler} okText="UPLOAD" okDisabled={!uploadFile} onCancel={() => { dispatch(toggleCharacterUpload()) }} description="">
                <input type="file" accept=".json" onChange={onChangeHandler} />
            </Modal>
        </>

    )
}
