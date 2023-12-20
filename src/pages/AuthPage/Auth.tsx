import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addUser, selectUser } from '../../store/userSlice';
import {
  // addFavoritesFromDb,
  // clearFavorites,
  replaceFavorites,
} from '../../store/favoriteSlice';

export type User = {
  id: string;
  email: string;
  name: string;
};

export const loadUsersFavorites = async () => {
  try {
    const res = await fetch(
      'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/user/favorites',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
      },
    );

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log((error as Error).message);
    alert('помилка з фейворіт');
  }
};

const AuthPage = () => {
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [pass, setPass] = useState('');
  // const [error, setError] = useState(false);

  const user = useAppSelector(selectUser);
  const dispatcher = useAppDispatch();

  // const signOut = async () => {
  //   try {
  //     await fetch(
  //       'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/auth/signOut',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json; charset=UTF-8',
  //         },
  //         credentials: 'include',
  //       },
  //     );

  //     dispatcher(removeUser());
  //     dispatcher(clearFavorites());
  //     //також треба буде видаляти картку замовлень та решту персональних даних зі стейту
  //   } catch (error) {
  //     console.log((error as Error).message);
  //     setError(true);
  //   }
  // };

  // const signIn = async (e: React.FocusEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setError(false);
  //   try {
  //     const response = await fetch(
  //       'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/auth/signIn',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json; charset=UTF-8',
  //         },
  //         credentials: 'include',
  //         body: JSON.stringify({
  //           email,
  //           password: pass,
  //         }),
  //       },
  //     );

  //     const userDataFromServer = await response.json();

  //     const data = await loadUsersFavorites(); // після того як залогінились тянемо з бази збережені улюблені
  //     // та додаємо до тих які він наклацав поки був не залогінений
  //     console.log(userDataFromServer);

  //     dispatcher(addUser(userDataFromServer));
  //     dispatcher(addFavoritesFromDb(data));
  //   } catch (error) {
  //     console.log((error as Error).message);
  //     setError(true);
  //   }
  // };

  useEffect(() => {
    //наступний код дублюється, можна повиносити в більш універсальні функції
    const checkIfAuthorized = async () => {
      // щоразу при першому рендері буде перевіряти чи дійсний кукі ключ
      if (user) {
        return; //якщо юзер є - виходимо
      }

      try {
        const response = await fetch(
          'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/auth/checkIfAuthorized',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
          },
        );

        if (!response.ok) {
          return; // якщо 401 - виходимо
        }

        const userDataFromServer = await response.json();

        const data = await loadUsersFavorites();
        dispatcher(replaceFavorites(data)); //замінюємо улюблені щоб уникнути дублюванні при повторному відкритті вкладки будучи авторизованим
        console.log(userDataFromServer);

        dispatcher(addUser(userDataFromServer)); //додаємо юзера в стейт
      } catch (error) {
        console.log((error as Error).message);
        // setError(true);
      }
    };

    checkIfAuthorized();
  }, []);

  return (
    <>
      {/* <h1>User: {user ? user?.name : 'no user'}</h1>
      <form onSubmit={signIn}>
        <label htmlFor="email">Email</label>
        <input
          name="emal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input
          name="pass"
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
      <p style={{ color: 'red' }}>{error && 'Щось пішло не так'}</p> */}
    </>
  );
};

export default AuthPage;
