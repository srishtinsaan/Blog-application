import {tinymce} from "@tinymce/tinymce-react"
import conf from "../conf/conf"
import {Controller} from "react-hook-form"
export default function RTE({name, control, label, defaultValue =""}) {
    
  return (
    <div className='w-full'> 
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        {/* // hum chahte to useForm karna the pr nahi kr skte bcz tinyMCD third party h na ki khudka input component 
        // that is why we use Controller for third party stuff */}
        <Controller 
            name="email"
            control={control} //controller component ko form se connect karne k liye.
            defaultValue=""
            render={({ field : {onChange} }) => (
               <Editor
                    apiKey={conf.tinymceID}
                    initialValue="<p>I am ready to write!</p>"
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
                        toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
            /> 
            
            )}
        />
    </div>
  )
}

