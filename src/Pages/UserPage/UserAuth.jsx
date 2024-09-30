import React from 'react';
import UserRegister from '../../Components/Auth/UserRegister';
import UserLogin from '../../Components/Auth/UserLogin';

function UserAuth({ form }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center rounded-lg shadow-lg">
        {form === 'login' ? <UserLogin /> : <UserRegister />}
      </div>
    </div>
  );
}

export default UserAuth;
