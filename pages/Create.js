import {Form, Formik, Field, ErrorMessage, useFormik, useFormikContext, FormikProvider} from "formik";
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import storage from "../firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SchemaError = Yup.object().shape({
    name: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    description: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required")
});

export function Create() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(true)

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            images: []
        },
        validationSchema: SchemaError,
        onSubmit: (values) => {
            console.log(values);
            // dispatch(addProduct(values)).then(() => {navigate('/home/list', {state: {name: 'Linh', isHandsome: 'Sure'}})})
        }
    });


    // Nếu không sử dụng Array.from
    // const handleChange = async (event) => {
    //     const fileList = event.target.files;
    //     for (const file of fileList) {
    //         console.log(file.name);
    //         // do something with each file
    //     }
    // }


    // Mỗi lần upload nó sẽ setFiles cho các ảnh cho lần upload đấy thôi
    const handleChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        console.log(selectedFiles)
        setFiles(selectedFiles);
    }

    // const handleChange = async (event) => {
    //     const selectedFiles = Array.from(event.target.files);
    //     console.log(selectedFiles)
    //     // Lọc bỏ các file đã tồn tại trong danh sách
    //     const newFiles = selectedFiles.filter(file => !files.some(f => f.name === file.name));
    //     setFiles((prevState) => [...prevState, ...newFiles]);
    // }


//Hàm handleUpload được gọi mỗi khi files thay đổi, tức là mỗi khi nhấn upload
    useEffect(() => {
        if (files.length > 0) {
            console.log('run use effect')
            handleUpload();
        }
    }, [files]);
    const handleUpload = async () => {
       setIsSubmit(true)
        const uploadPromises = files.map((file) => {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    null,
                    reject,
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((url) => {
                                resolve(url);
                            })
                            .catch(reject);
                    }
                );
            });
        });

        try {
            const imageUrls = await Promise.all(uploadPromises);
            formik.setFieldValue("images", [...formik.values.images, ...imageUrls]);
            setIsSubmit(false)
             setFiles([]);
        } catch (error) {
            setIsSubmit(false)
            console.error(error);
        }
    };

    return (
        <FormikProvider value={formik}>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <p style={{ color: 'red' }}><ErrorMessage name="name" /></p>

                <Field type="text" name="description" placeholder="Description" />
                <p style={{ color: 'red' }}><ErrorMessage name="description" /></p>

                <div>
                    <Field type="file" multiple name={'myImage'}  onChange={(e) =>{handleChange(e)}} accept="/image/*" />
                        {formik.values.images.map((imageUrl, index) => (
                            <div key={index}>
                                <img src={imageUrl} width="20px" />
                            </div>
                        ))}
                </div>

                <button type='submit' disabled={isSubmit}>Add</button>
            </Form>

        </FormikProvider>
    );
}