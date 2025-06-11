import Swal from "sweetalert2";

type DeleteConfirmationProps = {
  onConfirm: () => void;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
};

export const showSuccessAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    showClass: {
      popup: `animate__animated animate__fadeInUp animate__faster`,
    },
    hideClass: {
      popup: `animate__animated animate__fadeOutDown animate__faster`,
    },
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    showClass: {
      popup: `animate__animated animate__shakeX animate__faster`,
    },
  });
};

export const showWarningAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
  });
};

const DeleteConfirmation = async ({
  onConfirm,
  title = "Apakah Anda yakin?",
  text = "Tindakan ini tidak bisa dibatalkan!",
  confirmText = "Ya, hapus!",
  cancelText = "Batal",
}: DeleteConfirmationProps) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });

  if (result.isConfirmed) {
    await onConfirm();

    await Swal.fire({
      title: "Terhapus!",
      text: "Item telah berhasil dihapus.",
      icon: "success",
    });
  }
};

export default DeleteConfirmation;
