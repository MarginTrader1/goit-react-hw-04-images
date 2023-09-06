import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.js/ImageGallery';
import { LoadMoreButton } from './Button/Button';

// импорт запроса
import { fetchImages } from 'API';

// импорт спиннера как компонента
import { Hourglass } from 'react-loader-spinner';

export const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPhotos, setLoadedPhotos] = useState(0);
  const [maxPhotos, setMaxPhotos] = useState(0);

  // получаем велью инпута, которое записываем в state
  const getQuery = newQuery => {
    // проверка на пустой запрос
    if (newQuery === '') {
      return alert(`Пустая строка! Введите слово для поиска!`);
    }
    // делаем запрос уникальным по методу ниже и записываем его в state
    setSearchQuery(`${Date.now()}/${newQuery}`.trim());
    setData([]);
    setPage(1);
  };

  // запрос за следующей страничкой
  const newPage = () => setPage(prevState => prevState + 1);

  // основной запрос на сервер делаем через useEffect
  useEffect(() => {
    //запрет запроса при загрузке страницы
    if (searchQuery === '') return;

    //создаем ассинхронную функцию getImages (необходимый паттерн для иссинхронных функций в useEffect)
    async function getImages() {
      // уникальный запрос (строку) обрезаем до стандартного слова
      const query = searchQuery.slice(14);

      // реализация отображения загрузки
      setIsLoading(true);

      // запрос на сервер и сразу деструктуризируем объект
      const { totalHits, hits } = await fetchImages(query, page);

      // *меняем state*
      // если page равен 1 -> полностью меняем старый массив на новый массив (для новых запросов)
      if (page === 1) {
        setData(hits);
        setIsLoading(false);
        setLoadedPhotos(hits.length);
        setMaxPhotos(totalHits);
        return;
      }
      // если page больше 1 -> создаем массив, в который распыляем старый массив и распыляем новый массив (для кнопки LoadMore)

      setData(prevState => [...prevState, ...hits]);
      setIsLoading(false);
      setLoadedPhotos(prevState => prevState + hits.length);
    }
    // вызываем ассинхронную функцию getImages (необходимый паттерн для иссинхронных функций в useEffect)
    getImages();
  }, [searchQuery, page]);

  return (
    <>
      <Searchbar getQuery={getQuery} />
      {/* продолжение реализации для отображения загрузки isLoading */}
      {isLoading ? (
        // если isLoading: true --> показываем спинер
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass="hourglass-loading"
          colors={['#306cce', '#72a1ed']}
        />
      ) : (
        // если isLoading: false --> рендерим галерею
        <ImageGallery images={data} />
      )}
      {/* прячем кнопку LoadMore если массив пустой или загружено максимум фото*/}
      {data.length === 0 || loadedPhotos === maxPhotos ? null : (
        <LoadMoreButton loadMore={newPage} />
      )}
    </>
  );
};
