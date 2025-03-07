import Swal, { SweetAlertOptions } from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  preConfirm: (toast:any) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});


const makeToast = (type: SweetAlertOptions['icon'], msg: string): void => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default makeToast;
