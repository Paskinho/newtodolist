import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = (props: AddItemFormPropsType) => {
    const [title,setTitle]= useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }


const onClickAddItem = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
        props.addItem(trimmedTitle)
    } else {
        setError(true)
    }
    setTitle("")
}
const onKeyDownEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()

    return (
        <div>

            <input
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddItem}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddItem}>+</button>
            {error &&
                <div style={{fontWeight: "bold", color: "hotpink"}}>
                    Title is required</div>}

            </div>
    );
};

export default AddItemForm;