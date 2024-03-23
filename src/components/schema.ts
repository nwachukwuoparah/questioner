import * as yup from "yup"

export const loginSchema = yup
    .object({
        email: yup.string().required().email()
    })
    .required()

export const signupSchema = yup
    .object({
        profilePicture: yup.mixed()
            .test({
                name: "required",
                message: "Image is requried",
                test: (value: any) => value?.length > 0
            })
            .test({
                name: "fileSize",
                message: "Uploaded should be an image",
                test: (value) => {
                    const imageFormats = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/bmp",
                        "image/tiff",
                        "image/svg+xml",
                        "image/webp",
                        "image/x-icon",
                    ];
                    if (typeof value === "object" && value instanceof FileList) {
                        const image = value?.[0];
                        return imageFormats.includes(image?.type);
                    } else {
                        return true;
                    }
                },
            }),
        fullName: yup.string().required("FullName is a required field")
            .matches(
                /^[A-Za-z ]+$/,
                "Full name should not contain any special characters"
            ),
        email: yup.string().required("Email is a required field").email("Email must be a valid email format"),
        password: yup.string().required("Password is a required field")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/,
                "Password must be 8 characters long, uppercase and special character (!@#$%^&*)."
            ),
        stack: yup.string().required("Stack is a required field"),
    })
    .required()

export const editSchema = yup
    .object({
        profilePicture: yup.mixed()
            .test({
                name: "required",
                message: "Image is requried",
                test: (value: any) => value?.length > 0
            })
            .test({
                name: "fileSize",
                message: "Uploaded should be an image",
                test: (value) => {
                    const imageFormats = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/bmp",
                        "image/tiff",
                        "image/svg+xml",
                        "image/webp",
                        "image/x-icon",
                    ];
                    if (typeof value === "object" && value instanceof FileList) {
                        const image = value?.[0];
                        return imageFormats.includes(image?.type);
                    } else {
                        return true;
                    }
                },
            }),
        fullName: yup.string().required("FullName is a required field")
            .matches(
                /^[A-Za-z ]+$/,
                "Full name should not contain any special characters"
            ),
        stack: yup.string().required("Stack is a required field"),
    })
    .required()