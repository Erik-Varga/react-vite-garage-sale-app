import React from 'react'

const ListItem = (props) => {
    const data = props.data;

    const listItem = data.map((item) => {
        return (
            <li>
                {item.id} {id.title}
            </li>
        )
    })

  return (
    <div>{listItem}</div>
  )
}

export default ListItem