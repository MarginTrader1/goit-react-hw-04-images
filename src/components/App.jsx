import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.js/ImageGallery';
import { LoadMoreButton } from './Button/Button';

// импорт запроса
import { fetchImages } from 'API';

// импорт спиннера как компонента
import { Hourglass } from 'react-loader-spinner';

export class App extends Component {
  state = {
    data: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    loadedPhotos: 0,
    maxPhotos: 0,
  };

  // получаем велью инпута, которое записываем в state
  getQuery = newQuery => {
    // проверка на пустой запрос
    if (newQuery === '') {
      return alert(`Пустая строка! Введите слово для поиска!`);
    }
    // делаем запрос уникальным по методу ниже и записываем его в state
    this.setState({
      searchQuery: `${Date.now()}/${newQuery}`.trim(),
      data: [],
      page: 1,
    });
  };

  // основной запрос на сервер делаем в componentDidUpdate
  async componentDidUpdate(prevProps, prevState) {
    // проверка на новые данные
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      // уникальный запрос (строку) обрезаем до стандартного слова
      const searchQuery = this.state.searchQuery.slice(14);

      // реализация отображения загрузки
      this.setState({ isLoading: true });

      // запрос на сервер и сразу деструктуризируем объект
      const { totalHits, hits } = await fetchImages(
        searchQuery,
        this.state.page
      );

      // меняем state
      this.setState(prevState => {
        // если page равен 1 -> полностью меняем старый массив на новый массив (для новых запросов)
        if (prevState.page === 1) {
          return {
            data: hits,
            isLoading: false,
            loadedPhotos: hits.length,
            maxPhotos: totalHits,
          };
        }

        // если page больше 1 -> создаем массив, в который распыляем старый массив и распыляем новый массив (для кнопки LoadMore)
        return {
          data: [...prevState.data, ...hits],
          isLoading: false,
          loadedPhotos: prevState.loadedPhotos + hits.length,
        };
      });
    }
  }

  // запрос за следующей страничкой
  newPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    // деструктуризируем state перед использованием
    const { data, isLoading, loadedPhotos, maxPhotos } = this.state;

    return (
      <>
        <Searchbar getQuery={this.getQuery} />
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
          <LoadMoreButton loadMore={this.newPage} />
        )}
      </>
    );
  }
}
