# Users

    - _id
    - name
    - email
    - state
        - _id
        - name
    - passwordHash
    - token

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
