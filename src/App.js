import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  Div,
  View,
  AdaptivityProvider,
  AppRoot,
  Panel,
  PanelHeader,
  Group,
  VKCOM,
  Header,
  Title,
  Text,
  RichCell,
  Avatar,
  UsersStack,
  Button,
  CardGrid,
  Card,
  Link,
  CardScroll,
  ContentCard,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

const App = ({ sizeX }) => {
  const [activePanel] = useState("home");
  const [authors, setAuthors] = useState([
    {
      name: "Александр Черных",
      img: "https://avatars.githubusercontent.com/u/50127101?v=4",
      link: { title: "GitHub", url: "https://github.com/whitered932" },
      shortDesc: "Fullstack разработчик, Екатеринбург",
      fullDesc:
        'Занимаюсь веб-разработкой около 2х лет. Состою в команде "Три тарелки", которая занимается разработкой приложения для полезного питания. Отвечаю за Back-end и связь с Front-end\'ом',
    },
    {
      name: "Артём Васеньков",
      img: "https://media.discordapp.net/attachments/880358646213652483/889092260325654568/c7dc1587871f6ffe.png",
      link: { title: "VK", url: "https://vk.com/tema_nejor" },
      shortDesc: "Unity & Kotlin разработчик, Екатеринбург",
      fullDesc: "",
    },
    {
      name: "Андрей Михальченков",
      img: "https://media.discordapp.net/attachments/880358646213652483/889091787082309662/alt-profile-picture.png",
      link: { title: "GitHub", url: "https://github.com/alt3r3dgd" },
      shortDesc: "Java & Kotlin разработчик, Екатеринбург",
      fullDesc:
        "Меня зовут Андрюша, и я умею много что (но не так классно, как те, кто умеет лишь что-то одно). Делаю игры, мобильные приложения, дизайны и некоторые другие проекты. Имею знание языков Java, Kotlin, C#, JavaScript/TypeScript (обобщённо), Python и GDScript (для Godot Engine). Из своих личных достижений могу отметить несколько игр, опубликованных на Google Play и Itch.io.",
    },
    {
      name: "Михаил Просвирнин",
      img: "https://sun9-8.userapi.com/impg/q9BhH9_sxzwPII3gtqgPSG_mxoQQllucuSSVmw/px6apn5OyC0.jpg?size=1080x778&quality=96&sign=cc1cecffc5e8a69897dc91b134dde85e&type=album",
      link: { title: "VK", url: "https://vk.com/soryu.asuka.langley" },
      shortDesc: "Unity разработчик, Екатеринбург",
      fullDesc: "",
    },
  ]);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
  }, []);

  return (
    <AdaptivityProvider>
      <AppRoot>
        <View activePanel={activePanel}>
          <Panel id="home">
            <PanelHeader>Боевые Утята</PanelHeader>
            <Group>
              <Div>
                <Title level={"1"} weight={"semibold"}>
                  Команда и участие в "Вездекод"
                </Title>
                <Text style={{ marginTop: 15 }}>
                  Решение участвовать на Вездекоде и создать команду было
                  принято спонтанно - "Давайте попробуем".
                </Text>
                <Text>
                  Команда состоит из 4-х талантливых первокурсников УрФУ. Каждый
                  из них хорош в своём деле.
                </Text>
              </Div>
            </Group>
            <Group>
              <Div>
                <Title level={"1"} weight={"semibold"}>
                  Состав команды
                </Title>
              </Div>
              <CardScroll style={{ marginTop: 15 }} size="m">
                {authors.map((author) => (
                  <Card>
                    <RichCell
                      before={<Avatar size={72} src={author.img} />}
                      caption={author.shortDesc}
                      actions={
                        <Link href={author.link.url} target={"_blank"}>
                          <Button mode={"primary"}>{author.link.title}</Button>
                        </Link>
                      }
                    >
                      {author.name}
                    </RichCell>
                  </Card>
                ))}
              </CardScroll>
            </Group>
            <Group>
              <Div>
                <Title level={"1"} weight={"semibold"}>
                  Каждый о себе
                </Title>
                <CardGrid size="l" style={{ marginTop: 15 }}>
                  {authors.map((author) => (
                    <ContentCard
                      src={author.img}
                      header={author.name}
                      maxHeight={150}
                      text={author.fullDesc}
                    />
                  ))}
                </CardGrid>
              </Div>
            </Group>
          </Panel>
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};

export default App;
