import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  let role=localStorage.getItem('role');
  if(role){
    console.log(role)
 return true;
  }else{
    console.log('false')
    return false;
  }
  
};
