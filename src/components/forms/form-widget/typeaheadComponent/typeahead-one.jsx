import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {Button, ButtonToolbar} from 'react-bootstrap';
import axios from 'axios'

const TypeaheadOne = () =>  {

        const ref = useRef();

        const [options,setOptions] = useState([])

        useEffect(() => {
            axios.get(`/api/typeaheadData.json`).then(res => setOptions(res.data))
        },[])

        return (
          <Fragment>
            <Typeahead
              id="public-typeahead"
              defaultSelected={options.slice(0, 4)}
              labelKey="name"
              multiple
              options={options}
              placeholder="Choose a state..."
              ref={ref}
            />
            <ButtonToolbar style={{marginTop: '10px',margin:'4px'}}>
              <Button
                className="m-2"
                onClick={() => ref.current.clear()}>
                {"Clear"}
              </Button>
              <Button
                className="m-2"
                onClick={() => ref.current.focus()}>
                {"Focus"}
              </Button>
              <Button
                className="m-2" 
                onClick={() => {
                  ref.current.focus();
                  setTimeout(() => ref.current.blur(), 1000);
                }}
                >
                {"Focus, then blur after 1 second"}
              </Button>
            </ButtonToolbar>
          </Fragment>
        );
      }

export default TypeaheadOne;