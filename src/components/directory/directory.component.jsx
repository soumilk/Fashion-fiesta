import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';
import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selectors';
// This is gonna be a class comonent, as we need to access the state of the menu-items
const Directory= ({sections})=>(
  <div className='directory-menu'>
    {
      sections.map(({id, ...othersectionprops})=> (
        <MenuItem key={id} {...othersectionprops}/> 
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});
export default connect(mapStateToProps)(Directory);