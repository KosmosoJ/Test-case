import cl from './Loader.module.css'

const Loader = () =>{
    return(
    <div className={cl.loader}>
                <div className={cl.first}></div>
                <div className={cl.second}></div>
                <div className={cl.first}></div>
    </div>
    )
}

export default Loader