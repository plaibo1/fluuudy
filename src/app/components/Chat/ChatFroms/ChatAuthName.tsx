import React, { useEffect, useState } from 'react'
import { login } from '../../../holeySocksSlice';
import { useAppDispatch } from '../../../hooks';



const ChatAuthName = () => {

  const dispatch = useAppDispatch();

  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const id = Math.floor(Math.random() * 200)

    fetch(`https://api.jikan.moe/v4/characters/${id}`)
      .then(res => res.json())
      .then(res => {
        setUserImage(res.data.images.jpg.image_url);
      })

  }, [])

  const setName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Boolean(userImage)) return;
    if (nameValue.trim().length === 0) return;
  
    dispatch(login({username: nameValue, userImg: userImage ? userImage : ''}));
  }

  const [nameValue, setNameValue] = useState('');
  
  return (
    <form
      className="p-3 rounded-md shadow-md inline-flex"
      onSubmit={setName}
    >
      <input
        placeholder="log in here"
        className="outline-none"
        type="text"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <button
        className="px-5 py-3 bg-green-300 rounded-md text-sm font-mono font-bold hover:bg-green-400"
        type="submit"
        disabled={!Boolean(userImage)}
      >
        LOG IN
      </button>
    </form>
  );
}

export default ChatAuthName