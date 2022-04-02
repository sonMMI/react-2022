import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    position: relative;
    flex: 1;

    & > input {
      width: 100%;
      height: 2rem;
      background: transparent;
      border: none;
      border-bottom: 1px solid teal;
      outline: none;
      padding: 0 0.5rem;
      flex: 1;
    }

    & > select {
      position: absolute;
      font-size: large;
      top: 4px;
      right: 0;
      border: none;
      outline: none;
      background: transparent;
      color: orange;
      font-weight: bolder;
      cursor: pointer;

      & > option {
        color: white;
        font-weight: bold;
        text-align: center;
        background: rgb(0, 172, 172);
      }
    }

    & > button {
      background: #555;
      border: none;
      outline: none;
      height: 2rem;
      padding: 0 1rem;
      margin-left: 7px;
      cursor: pointer;
      font-weight: 600;
      font-size: medium;
      color: white;
    }
  }
`

const FilterForm = () => {
  return (
    <div>
      <StyledForm>
        <div>
          <input type="text" placeholder="0" required />
          <select>
            <option value="lt" title="lesser than">
              LT
            </option>

            <option value="lte" title="lesser than or equal">
              LTE
            </option>

            <option value="gt" title="greater than">
              GT
            </option>

            <option value="lt" title="greater than or equal">
              GTE
            </option>
          </select>
        </div>
        <button>Submit</button>
      </StyledForm>
    </div>
  )
}

export default FilterForm
