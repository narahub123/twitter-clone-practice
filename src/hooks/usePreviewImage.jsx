import { useState } from "react"; // React의 useState 훅을 임포트
import useShowToast from "./useShowToast"; // 커스텀 훅 useShowToast를 임포트

// usePreviewImage 훅 정의
const usePreviewImage = () => {
  const [imgUrl, setImgUrl] = useState(null); // 이미지 URL을 저장하는 상태 변수, 초기값은 null
  const showToast = useShowToast(); // useShowToast 훅 호출하여 showToast 함수 가져오기

  // 파일 입력 변경 시 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 파일 입력에서 선택된 첫 번째 파일 가져오기

    // 파일이 존재하고, 파일 타입이 이미지인지 확인
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader(); // FileReader 객체 생성

      // 파일 읽기 완료 시 실행될 콜백 함수 정의
      reader.onloadend = () => {
        setImgUrl(reader.result); // 파일의 데이터 URL을 imgUrl 상태에 저장
        // reader.result는 base64 인코딩된 문자열을 담고 있음
      };

      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    } else {
      // 파일 타입이 이미지가 아닐 경우 오류 메시지 표시
      showToast("Invalid file type", "Please select an image file", "error");
      setImgUrl(null); // imgUrl 상태를 null로 설정
    }
  };

  // handleImageChange 함수와 imgUrl 상태를 반환하여 다른 컴포넌트에서 사용할 수 있게 함
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImage; // usePreviewImage 훅을 기본 내보내기로 설정
