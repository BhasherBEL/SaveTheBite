import sqlite3
import base64

def rename_column(table):
    # Connect to your SQLite database
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Query to select BLOB data
    cursor.execute(f"SELECT id, picture FROM {table}")  # Adjust your table and column names

    # Add a new column to store the base64-encoded picture
    cursor.execute(f"ALTER TABLE {table} ADD COLUMN picture_base64 TEXT")

    # Iterate over the rows
    for row in cursor.fetchall():
        picture_id = row[0]
        picture_blob = row[1]

        # Convert BLOB to base64
        picture_base64 = base64.b64encode(picture_blob).decode('utf-8')  # .decode('utf-8') to get string representation

        if picture_blob:
            # Convert BLOB to base64
            picture_base64 = base64.b64encode(picture_blob).decode('utf-8')  # .decode('utf-8') to get string representation

            # Update the record with the base64-encoded picture
            cursor.execute(f"UPDATE {table} SET picture_base64 = ? WHERE id = ?", (picture_base64, picture_id))
            print(f"ID: {picture_id} - Picture updated")
        else:
            # In case the BLOB is None (no image)
            cursor.execute(f"UPDATE {table} SET picture_base64 = NULL WHERE id = ?", (picture_id,))

    # Remove the BLOB column
    cursor.execute(f"ALTER TABLE {table} DROP COLUMN picture")

    # Rename the base64 column
    cursor.execute(f"ALTER TABLE {table} RENAME COLUMN picture_base64 TO picture")

    # Commit the changes
    conn.commit()

    # Close the connection
    conn.close()

if __name__ == '__main__':
    rename_column('Baskets')  # Adjust your table name
