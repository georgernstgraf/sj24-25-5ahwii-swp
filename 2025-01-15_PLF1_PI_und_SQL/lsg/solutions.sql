-- never order:
SELECT
    *
FROM
    customers
WHERE
    id NOT IN (
        SELECT
            customerid
        FROM
            orders
    );

-- delete duplicate emails
DELETE FROM
    person
WHERE
    id = (
        SELECT
            max(id)
        FROM
            person
        WHERE
            email = (
                SELECT
                    email
                FROM
                    person
                GROUP BY
                    email
                HAVING
                    count() > 1
            )
    );

--- bessser:
DELETE FROM
    person
WHERE
    id NOT IN (
        SELECT
            min(id)
        FROM
            person
        WHERE
            email IN (
                SELECT
                    email
                FROM
                    person
                GROUP BY
                    email
                HAVING
                    count() > 1
            )
        GROUP BY
            email
    );

-- delete duplicate emails Lösung BEN
DELETE FROM
    person
WHERE
    id NOT IN (
        SELECT
            min(id)
        FROM
            person
        GROUP BY
            email
    );

-- bzw amal nur suchen
SELECT
    *
FROM
    person
WHERE
    id NOT IN (
        SELECT
            min(id)
        FROM
            person
        GROUP BY
            email
    );