# Users

    - _id
    - name
    - email
    - state
    - passwordHash
    - token

# State

    - _id
    - name

# Categories

    - _id
    - name
    - slug

# Ads

    - _id
    - idUser
    - state
    - category
    - images[{url, default:true}]
    - dataCreated
    - title
    - price
    - priceNegotiable: true
    - description
    - views
    - status
