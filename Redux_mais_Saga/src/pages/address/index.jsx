import { useReducer, useState } from 'react'
import styles from './address.module.css'
import { Header } from '../../components/header'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux';
import { addAddress, deletAddress } from '../../Redux/user/slice';

export function Address() {
  const { user } = useSelector((rootReducer) => rootReducer.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [addressName, setAddressName] = useState(user?.address?.location ?? "")
  const [addressNumber, setAddressNumber] = useState(user?.address?.number ?? "")


  function handleRegisterAddress(){
    // console.log(addressName, addressNumber)
    dispatch(addAddress({
      location: addressName,
      number: addressNumber
    }))
    navigate('/painel')
  }

  function handleDeletAddress(){
    dispatch(deletAddress())
    setAddressName("")
    setAddressNumber("")
  }

  return (
    <>
    <Header/>
      <div className={styles.container}>

        <main className={styles.content}>
          <div>
            <Link to="/painel">
              Voltar para o painel
            </Link>
            {user && user?.address && (
              <button className={styles.buttonDelete} onClick={handleDeletAddress}>
                Deletar endereço
              </button>
            )}
          </div>

          <section className={styles.address}>
           <h2>Meu endereço:</h2>

          <input 
            type="text" 
            className={styles.input}
            placeholder="Ex: Rua centro, x"
            value={addressName}
            onChange={ (e) => setAddressName(e.target.value) }
          />
          <input 
            type="text" 
            className={styles.input}
            placeholder="Numero"
            value={addressNumber}
            onChange={ (e) => setAddressNumber(e.target.value) }
          />

          <button className={styles.button} onClick={handleRegisterAddress}>
            Salvar Alteração
          </button>

          </section>
        </main>
      </div>
    </>
  )
}
