import * as yup from "yup"

export const loginSchema = yup
    .object({
        email: yup.string().required().email()
    })
    .required()

const optionSchema = yup.object().shape({
    option: yup
        .string()
        .required("Option is a required field")
    // Add any additional validation rules here
});

export const createSchema = yup.object({
    question: yup
        .string()
        .required("Question is a required field")
        .matches(/^[A-Za-z ]+$/, "Question should not contain special characters"),
    options: yup
        .array()
        .of(optionSchema) // Use optionSchema to validate each item in the options array
        .min(3, "At least one option is required") // Ensure there's at least one option
        .required("Options are required"), // Make the options array itself required
    id: yup.string()
});

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