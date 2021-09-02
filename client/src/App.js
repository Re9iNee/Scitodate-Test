function App() {
  return (
    <div>
      <form action="/database" enctype="multipart/form-data" method="post">
        <div>
          Text field title: <input type="text" name="title" />
        </div>
        <div>
          File:{" "}
          <input type="file" name="someExpressFiles"/>
        </div>
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}

export default App;
