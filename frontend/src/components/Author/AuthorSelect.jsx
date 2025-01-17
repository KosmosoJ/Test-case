import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const AuthorSelect = () =>{
    // Переиспользуемый компонент для вывода писателей при создании/редактировании книг
    const [authors, setAuthors] = useState([]);
    const [authorId, setAuthorId] = useState();
    const [showNewAuthorInput, setShowNewAuthorInput] = useState(false);
    const { authTokens } = useContext(AuthContext);
    // eslint-disable-next-line
    const [token, setToken] = useState(authTokens.token.replace('"', '').replace('"',''));
    

    const handleNewAuthorInput = () => setShowNewAuthorInput(!showNewAuthorInput);

    React.useEffect(() => {
        fetch("http://localhost:8000/api/authors/", {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setAuthors(data));
      }, [token]);

return(
<div>
        <label>Author</label>
        {!showNewAuthorInput && (
          <select
            id='author'
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            defaultValue={''}
          >
            <option value={''} disabled >--select author--</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        )}
        {showNewAuthorInput && (
          <input
            type="text"
            id="author"
            placeholder="Input new author"
            onChange={(e) => setAuthorId(e.target.value)}
          />
        )}
        <label>
          Add new author:
          <input
            type="checkbox"
            checked={showNewAuthorInput}
            onChange={handleNewAuthorInput}
          />
        </label>
      </div>
)}

export default AuthorSelect