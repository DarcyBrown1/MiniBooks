from .app import load

app = load()

if __name__ == "__main__":
    app.run(debug=True)
