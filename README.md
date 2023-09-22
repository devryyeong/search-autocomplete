## 한국임상정보 API를 사용한 검색어 자동완성 구현
> 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

<br/>

### 프로젝트 설치 및 실행

1. 로컬 환경으로 복사본 가져오기
```
git clone https://github.com/devryyeong/search-autocomplete.git
```

2. 프로젝트 실행하기

```
yarn start
```

3. json server 실행하기

```
cd api
npm install
npm start

```

<br/>

### 기술 스택
[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1695361610335?alt=media&token=fe507738-09ea-43bf-b234-beb6b5009a31)](https://github.com/msdio/stackticon)

<br/>

### 파일 / 폴더 구조
```
📦src
 ┣ 📂apis
 ┃ ┣ 📜sick.ts
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📜SearchBox.tsx
 ┃ ┗ 📜SearchResult.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useOnclickOutside.ts
 ┃ ┗ 📜useSearch.ts
 ┣ 📂pages
 ┃ ┣ 📜SearchPage.tsx
 ┣ 📂styles
 ┃ ┣ 📜App.css
 ┣ 📂types
 ┃ ┗ 📜sick.ts
 ┣ 📂utils
 ┃ ┗ 📜cache.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

<br/>

### 기능별 구현 전략
<details>
  <summary><b>1) 질환명 검색시 API 호출을 통해 검색어 추천 기능 구현</b></summary>

  - input field 값으로 API 요청시 qeury string으로 넣어 string이 포함하는 `sick data list`를 배열 형태로 얻는다.
    -  useState, onChange를 활용한 controlled 방식으로 input field 값을 얻는다.
    - API 요청하기 위한 비즈니스 로직을 구현하여 `sick data list`를 배열 형태로 얻는다.
- `SearchInput`, `SearchBox`, `useSearch` hook을 사용해 얻어낸 `sick data list`를 배열로 나열한다.
    - 추가적으로 'x'버튼을 클릭해 input field 값을 빈 문자열로 초기화하도록 구현했다.
    - `useOnclickOutside` hook을 구현해 검색창 바깥을 클릭했을 때 추천 리스트를 숨기도록 구현했다.

</details>

<details>
  <summary><b>2) API 호출별 로컬 캐싱 구현</b></summary>

  - cacheStorage를 활용하여 서버 데이터를 캐시로 저장하고, 필요할 때 지정된 데이터를 반환하여 서버 부하를 줄이는 방식을 택했다.
  - cacheStorage는 Response 객체를 저장하는데, AxiosResponse 객체는 저장할 수 없으므로 data만 추출하여 생성자 Response로 Response 객체를 만들어 저장했다.
    - Response 객체 대신 URI를 통해 Response 객체로 변환하여 저장할 수 있지만, URI에는 `BASE_URL`과 `pathname`이 있고, `BASE_URL`을 중복해서 사용하는 것을 줄이고자 axios instance에 등록했기 때문에 Response 생성자 함수를 사용했다.
  - cacheStorage에 Response 객체를 저장할 때 put 메서드를 이용해 추가 또는 기존 Response를 덮어씌웠다.

</details>

<details>
  <summary><b>3) 입력마다 API 호출되지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행</b></summary>
  
  - 입력마다 `onChange` 이벤트 핸들러 함수가 호출되어 `input field` 값이 업데이트된다.
  - `input field` 값이 변경될 때마다 과도한 API 호출을 하게 되는 이슈가 있다.
  - 입력이 종료되는 시점에 API 호출을 하는 `debounce` 프로그래밍 기법을 사용했다.
    - `onChange`에 `debounce`를 적용할 경우, 키보드 입력이 종료될 때 사용자의 화면에 입력값이 표시되어 사용자 경험에 악영향을 줄 수 있다.
    - `onChange`로 input field 값이 변경될 때, 입력이 종료되면 요청할 수 있도록 `debouncedValue`를 반환하는 `useDebounce` hook을 구현했다.
    - 결과적으로 딜레이가 걸린 `debouncedValue`가 변경되면 `debouncedValue`로 API 요청을 보내 과도한 API 호출을 방지할 수 있도록 했다.
  
</details>

<details>
  <summary><b>4) 키보드만으로 추천 검색어들로 이동 가능하도록 구현</b></summary>
  
  - 검색 후 키보드 위/아래 방향키를 누르면 해당 검색 결과 리스트를 선택했다는 표시가 시각적으로 보인다.
  - `onKeyDown` 이벤트 핸들러를 활용해 이벤트를 캐치한다.
  - 입력 횟수만큼 인덱스를 변경시켜 검색 결과 리스트를 선택한다.
  - 인덱스는 위 화살표를 계속 누르면 아무것도 선택하지 않은 경우와 동일해야 한다.
    - 인덱스의 최소값은 `-1` 이어야 한다.
  - 인덱스는 아래 화살표를 계속 누르면 가장 검색 결과 리스트중 가장 마지막 결과를 선택해야 한다.
    - 인덱스의 최대값은 `searchList.length - 1` 이어야 한다.
  - input field 값이 변경될 때 인덱스를 검색 결과를 선택하지 않은 상태로 초기화되어야 한다.
    - `useEffect`를 사용하여 `debouncedValue`가 변경될 때 인덱스를 `-1`로 초기화한다.

</details>