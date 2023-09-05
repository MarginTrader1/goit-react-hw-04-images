import { SearchForm, Button, Input } from './Searchbar.styled';

export const Searchbar = ({ getQuery }) => {
  return (
    <header>
      <SearchForm
        onSubmit={evt => {
          evt.preventDefault();
          getQuery(evt.target.elements.query.value);
          evt.target.reset();
        }}
      >
        <Button type="submit">
          <span>Search</span>
        </Button>

        <Input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </header>
  );
};
