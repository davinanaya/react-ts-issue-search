import React, { useState, useEffect, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { Alert } from 'react-bootstrap';

import { IIssues } from '../interfaces';
import { InputSearch, IssueList } from '../components';
import { useDebouncedState } from '../hooks';
import { getIssues } from '../services';

const IssueSearchLayout = () => {
  const [query, setQuery] = useDebouncedState('', 200);
  const [issues, setIssues] = useState<IIssues[]>([]);
  const [errors, setErrors] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const searchIssues = async () => {
      setIsLoading(true);
      try {
        const results = await getIssues(query);

        setIsLoading(false);
        setIssues(results || []);
      } catch (error) {
        setErrors(true);
        setIssues([]);
      }
    };

    setSelectedIndex(-1);
    setIssues([]);
    query && searchIssues();
  }, [query]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowUp':
          return selectedIndex > -1 && setSelectedIndex(selectedIndex - 1);
        case 'ArrowDown':
          return (
            selectedIndex < issues.length - 1 &&
            setSelectedIndex(selectedIndex + 1)
          );
      }
    },
    [selectedIndex, issues],
  );

  return (
    <div className="row">
      <div className="col">
        <div className="input-container">
          <InputSearch
            placeholder="Type to search"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
          />
        </div>
        {errors && !issues.length && (<Alert variant="danger">
          Error processing the data
        </Alert>)}

        {query && !isLoading && !issues.length && (<Alert variant="warning">
          No Results
        </Alert>)}
        <IssueList items={issues} selectedIndex={selectedIndex} />
      </div>
    </div>
  );
};

export default IssueSearchLayout;
